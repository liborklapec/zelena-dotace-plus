import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  address?: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse form data
    const formData: ContactFormData = await req.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.project_type) {
      return new Response(
        JSON.stringify({ error: 'Chybí povinná pole' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get IP address
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Initialize Supabase client with service role (bypass RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to database
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.project_type,
        address: formData.address || '',
        message: formData.message || '',
        ip_address: ip,
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Nepodařilo se uložit data');
    }

    // Send email via Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Zelená Dotace Plus <kontakt@zelena-dotace-plus.cz>',
            to: ['info@zelenadotaceplus.cz'],
            subject: `🟢 Nová poptávka: ${formData.project_type}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #16a34a;">Nová poptávka z webu</h2>
                
                <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #15803d;">Kontaktní údaje</h3>
                  <p><strong>Jméno:</strong> ${formData.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
                  <p><strong>Telefon:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
                </div>

                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #374151;">Detaily poptávky</h3>
                  <p><strong>Typ projektu:</strong> ${formData.project_type}</p>
                  ${formData.address ? `<p><strong>Adresa nemovitosti:</strong> ${formData.address}</p>` : ''}
                  ${formData.message ? `<p><strong>Zpráva:</strong><br>${formData.message.replace(/\n/g, '<br>')}</p>` : ''}
                </div>

                <div style="font-size: 12px; color: #6b7280; margin-top: 20px;">
                  <p>IP adresa: ${ip}</p>
                  <p>Čas odeslání: ${new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}</p>
                </div>
              </div>
            `,
          }),
        });

        if (emailResponse.ok) {
          // Mark email as sent
          await supabase
            .from('contact_submissions')
            .update({ email_sent: true })
            .eq('id', submission.id);
        } else {
          const error = await emailResponse.text();
          console.error('Resend API error:', error);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails - submission is saved
      }
    } else {
      console.warn('RESEND_API_KEY not configured - email not sent');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Děkujeme za vaši zprávu!',
        submissionId: submission.id,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Nastala chyba při odesílání formuláře',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
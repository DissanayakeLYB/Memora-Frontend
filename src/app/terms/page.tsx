import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service | Memora",
  description: "Terms and conditions for using Memora's photo album services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-180px)] py-12">
      <div className="container-narrow">
        {/* Back link */}
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <article className="prose prose-invert prose-stone max-w-none">
          <h1 className="heading-lg text-foreground mb-8">Terms of Service</h1>
          
          <p className="body-lg mb-8">
            Last updated: December 2025
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">Welcome to Memora</h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service govern your use of Memora&apos;s photo album platform and services. 
              By using Memora, you agree to these terms. Please read them carefully.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">1. Using Our Services</h2>
            <p className="text-muted-foreground mb-4">
              You must be at least 13 years old to use Memora. By using our services, you represent 
              that you meet this age requirement. You are responsible for maintaining the security 
              of your account and password.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">2. Your Content</h2>
            <p className="text-muted-foreground mb-4">
              You retain ownership of all photos and content you upload to Memora. By uploading content, 
              you grant us a limited license to process, store, and display your content solely for 
              the purpose of providing our services to you.
            </p>
            <p className="text-muted-foreground">
              You are responsible for ensuring you have the right to upload any content and that 
              it does not violate any laws or infringe on others&apos; rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">3. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Upload content that is illegal, harmful, or violates others&apos; rights.</li>
              <li>Use the service for any unlawful purpose.</li>
              <li>Attempt to access other users&apos; accounts or data.</li>
              <li>Interfere with or disrupt our services.</li>
              <li>Use automated means to access our services without permission.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">4. Service Availability</h2>
            <p className="text-muted-foreground">
              We strive to provide reliable services but cannot guarantee uninterrupted access. 
              We may modify, suspend, or discontinue features with reasonable notice. Album 
              processing times are estimates and may vary based on demand.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              Memora and its original content, features, and functionality are owned by Memora 
              and are protected by international copyright, trademark, and other intellectual 
              property laws. Your content remains yours.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, Memora shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use of 
              our services. We recommend keeping backup copies of your original photos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">7. Account Termination</h2>
            <p className="text-muted-foreground">
              You may delete your account at any time. We may suspend or terminate accounts that 
              violate these terms. Upon termination, your data will be deleted according to our 
              Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. We will notify you of significant changes 
              via email or through our service. Continued use after changes constitutes acceptance 
              of the new terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms, please contact us at{" "}
              <a href="mailto:psychdevs@gmail.com" className="text-primary hover:underline">
                psychdevs@gmail.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}


import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | Memora",
  description: "How Memora handles and protects your personal data and photos.",
};

export default function PrivacyPage() {
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
          <h1 className="heading-lg text-foreground mb-8">Privacy Policy</h1>
          
          <p className="body-lg mb-8">
            Last updated: December 2025
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-muted-foreground mb-4">
              At Memora, we understand that your photos hold irreplaceable moments. Your privacy 
              is not just a policy—it&apos;s a promise. We treat your memories with the same care 
              and respect you would expect from a trusted friend.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">Information We Collect</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong className="text-foreground">Account Information:</strong> Your name and email address when you create an account.</li>
              <li><strong className="text-foreground">Photos:</strong> The images you upload for album creation.</li>
              <li><strong className="text-foreground">Album Details:</strong> Titles, descriptions, and style preferences you provide.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Basic analytics to improve our service.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>To create and deliver your personalized photo albums.</li>
              <li>To communicate with you about your account and albums.</li>
              <li>To improve our services and user experience.</li>
              <li>To ensure the security of our platform.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">How We Protect Your Data</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong className="text-foreground">Encryption:</strong> All data is encrypted in transit and at rest.</li>
              <li><strong className="text-foreground">Secure Storage:</strong> Photos are stored in secure, access-controlled environments.</li>
              <li><strong className="text-foreground">Limited Access:</strong> Only essential personnel can access your data, and only when necessary.</li>
              <li><strong className="text-foreground">No Third-Party Sharing:</strong> We never sell or share your photos with third parties.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access and download your data at any time.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Delete your account and all associated data.</li>
              <li>Opt out of non-essential communications.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your photos and album data for as long as your account is active. 
              Upon account deletion, all your data is permanently removed from our systems 
              within 30 days. You can request immediate deletion by contacting our support team.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please contact us at{" "}
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


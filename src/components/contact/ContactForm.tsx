import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { submitContact, type ContactType } from "../../lib/api";
import { Button } from "../ui/Button";

type Props = {
  type: ContactType;
  submitLabel: string;
  messageRequired?: boolean;
  messagePlaceholder?: string;
};

export function ContactForm({
  type,
  submitLabel,
  messageRequired = true,
  messagePlaceholder = "How can we help?",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (messageRequired && !message.trim()) {
      setError("Please enter a message.");
      return;
    }
    setLoading(true);
    try {
      await submitContact({
        type,
        name: name.trim(),
        email: email.trim(),
        message: message.trim() || undefined,
      });
      setDone(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border-strong bg-success-muted p-6 text-center">
        <p className="font-semibold text-foreground">Message sent</p>
        <p className="mt-2 text-sm text-foreground-muted">
          We&apos;ll reply to your email soon.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-4 text-sm font-medium text-accent-bright hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
          Name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ui-input"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
          Email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="ui-input"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
          Message{messageRequired ? "" : " (optional)"}
        </label>
        <textarea
          required={messageRequired}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="ui-input resize-none"
          placeholder={messagePlaceholder}
        />
      </div>
      {error && (
        <p className="text-sm text-error" role="alert">{error}</p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {submitLabel}
      </Button>
    </form>
  );
}

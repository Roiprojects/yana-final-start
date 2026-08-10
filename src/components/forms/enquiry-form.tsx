
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/lib/schemas/enquiry";
import { api } from "@/lib/api/client";
import { Button } from "@/components/ui/button";

type Variant = "general" | "customized";

const fieldClass =
  "w-full rounded-lg border border-border-soft bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:border-primary";
const labelClass = "mb-1.5 block text-sm font-semibold";
const errorClass = "mt-1 text-xs text-danger";

export function EnquiryForm({ variant }: { variant: Variant }) {
  const isCustomized = variant === "customized";
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: { type: variant },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: EnquiryFormValues) {
    setSubmitError(null);
    const result = await api.submitEnquiry({ ...values, type: variant });
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    if (result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof EnquiryFormValues, { message });
      }
    }
    setSubmitError(result.error ?? "Something went wrong. Please try again.");
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-border-soft bg-white p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
        <h3 className="mt-4 text-lg font-bold">Thank you!</h3>
        <p className="mt-2 max-w-sm text-sm text-text-secondary">
          Your enquiry has been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-xl border border-border-soft bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name *
          </label>
          <input id="name" className={fieldClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone *
          </label>
          <input
            id="phone"
            inputMode="tel"
            className={fieldClass}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={fieldClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="travellers">
            Travellers
          </label>
          <input
            id="travellers"
            type="number"
            min={1}
            className={fieldClass}
            {...register("travellers")}
          />
          {errors.travellers && (
            <p className={errorClass}>{errors.travellers.message}</p>
          )}
        </div>

        {!isCustomized && (
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="destinationInterest">
              Destination of interest
            </label>
            <input
              id="destinationInterest"
              className={fieldClass}
              {...register("destinationInterest")}
            />
          </div>
        )}

        {isCustomized && (
          <>
            <div>
              <label className={labelClass} htmlFor="scope">
                Trip type
              </label>
              <select id="scope" className={fieldClass} {...register("scope")}>
                <option value="">Select…</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="budgetRange">
                Budget range
              </label>
              <input
                id="budgetRange"
                className={fieldClass}
                {...register("budgetRange")}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="hotelCategory">
                Preferred hotel category
              </label>
              <input
                id="hotelCategory"
                className={fieldClass}
                {...register("hotelCategory")}
              />
            </div>
          </>
        )}

        <div>
          <label className={labelClass} htmlFor="travelDate">
            Preferred travel date
          </label>
          <input
            id="travelDate"
            type="date"
            className={fieldClass}
            {...register("travelDate")}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={fieldClass}
          {...register("message")}
        />
      </div>

      {submitError && (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {submitError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Sending…" : "Submit enquiry"}
      </Button>
    </form>
  );
}

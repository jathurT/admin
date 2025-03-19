import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContactUs } from "@/types/contact-us";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactUsReplyFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedContactUsID: string | number | null;
}

const ContactUsReplyForm: React.FC<ContactUsReplyFormProps> = ({
  setIsOpen,
  selectedContactUsID,
}) => {
  const [reply, setReply] = useState<string>("");
  const [contactDetails, setContactDetails] = useState<ContactUs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (!selectedContactUsID) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get<ContactUs>(
          `/contacts/${selectedContactUsID}`
        );
        setContactDetails(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch contact details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [selectedContactUsID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !selectedContactUsID) return;

    try {
      setSubmitting(true);
      await axiosInstance.put(
        `/contacts/sendReply/${selectedContactUsID}`,
        reply
      );

      toast({
        title: "Success",
        description: "Reply sent successfully!",
      });

      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">Loading contact details...</div>
    );
  }

  return (
    <div className="p-4">
      {contactDetails && (
        <div className="mb-6 space-y-4">
          <div className="border-b pb-3">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Name:</span>
                <p className="truncate">{contactDetails.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Email:
                </span>
                <p className="truncate">{contactDetails.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Contact Number:
                </span>
                <p className="truncate">{contactDetails.contactNumber}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Subject:
                </span>
                <p className="truncate">{contactDetails.subject}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2">Message:</h4>
            <ScrollArea className="">
              <div className="bg-muted p-3 rounded-md w-full break-words">
                <p className="whitespace-pre-wrap">{contactDetails.message}</p>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reply">Your Reply</Label>
          <Textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply here..."
            className="min-h-32 resize-none"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting || !reply.trim()}>
            {submitting ? "Sending..." : "Send Reply"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsReplyForm;

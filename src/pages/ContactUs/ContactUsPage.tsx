import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import ContactUsCard from "./contact-us-card";
import { ContactUs } from "@/types/contact-us";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import ContactUsReplyForm from "./contact-us-reply-form";

const FeedbackPage: React.FC = () => {
  const [contactUs, setContactUs] = useState<ContactUs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedContactUsID, setSelectedContactUsID] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ContactUs[]>("/contacts/all");
        setContactUs(response.data);
      } catch (err) {
        setError("Failed to fetch contact us.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleContactCardClick = (id: string) => {
    setSelectedContactUsID(id);
    setIsDialogOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-5 lg:px-0">
      <ResponsiveDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Feedback Details"
        className="sm:max-w-screen-md"
      >
        <ContactUsReplyForm
          setIsOpen={setIsDialogOpen}
          selectedContactUsID={selectedContactUsID}
        />
      </ResponsiveDialog>
      <div>
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p>Welcome to Contact Us!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 py-4  ">
        {contactUs.map((contact) => (
          <ContactUsCard
            key={contact.id}
            {...contact}
            onClick={() => handleContactCardClick(contact.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;

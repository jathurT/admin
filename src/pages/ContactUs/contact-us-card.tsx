import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ContactUs } from "@/types/contact-us";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, User, Captions } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContactUsCardProps extends ContactUs {
  onClick?: (id: string | number) => void;
  onCardClick?: (id: string | number) => void;
}

const ContactUsCard: React.FC<ContactUsCardProps> = ({
  id,
  name,
  email,
  contactNumber,
  subject,
  message,
  onClick,
  onCardClick,
}) => {
  return (
    <Card
      className="w-full h-full border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
      onClick={() => onCardClick && onCardClick(id)}
    >
      <CardContent className="p-0 flex-grow">
        {/* Header section with name */}
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center space-x-2">
            <User size={18} className="text-gray-500 shrink-0" />
            <h3 className="text-lg font-medium truncate capitalize">{name}</h3>
          </div>
        </div>
        {/* Contact information */}
        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-gray-500 shrink-0" />
            <p className="text-sm text-gray-600 truncate">{contactNumber}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-gray-500 shrink-0" />
            <p className="text-sm text-gray-600 truncate">{email}</p>
          </div>

          {/* Message preview with subject above */}
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Captions size={16} className="text-gray-500 shrink-0" />
                <p className="text-sm font-medium">Subject:</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3 ">{subject}</p>
          </div>

          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} className="text-gray-500 shrink-0" />
                <p className="text-sm font-medium">Message:</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3 ">{message}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-muted/20 border-t flex justify-end mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(id);
          }}
        >
          Reply
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactUsCard;

"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { sendClientEmail } from "@/services/dockit/projects";

const CLIENT_LINK = "https://dockit.app/preview/abc123xyz";

export const useShareFlow = (clientLink = CLIENT_LINK) => {
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const [email, setEmail] = useState("legal@majujaya.co.id");
  const [message, setMessage] = useState(
    "Hi, please review and sign the documents for our project.",
  );

  const emailMutation = useMutation({
    mutationKey: ["dockit", "share", "email"],
    mutationFn: () => sendClientEmail({ email, message }),
  });

  const copyLink = async () => {
    await navigator.clipboard.writeText(clientLink);
    setCopyLabel("Copied ✓");

    setTimeout(() => {
      setCopyLabel("Copy link");
    }, 2000);
  };

  return {
    clientLink,
    copyLabel,
    email,
    isSending: emailMutation.isPending,
    message,
    copyLink,
    sendEmail: emailMutation.mutate,
    setEmail,
    setMessage,
  };
};

"use client";

import { useInboxActions } from "./use-inbox-actions";
import { useInboxData } from "./use-inbox-data";

export function useInboxPage() {
  const data = useInboxData();

  const actions = useInboxActions({
    selectedConversation: data.selectedConversation,
    setConversations: data.setConversations,
    setSelectedId: data.setSelectedId,
    setMobileDrawerOpen: data.setMobileDrawerOpen,
  });

  return {
    ...data,
    ...actions,
  };
}

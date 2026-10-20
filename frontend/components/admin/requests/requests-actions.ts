import { API_URL } from "@/lib/api";
import type { Request, RequestStatus } from "@/lib/inbox/request-types";

type ActionContext = {
  token: string;
  selectedRequest: Request;
};

type UpdateContext = ActionContext & {
  onStart: () => void;
  onSuccess: (updatedRequest: Request) => void;
  onError: (message: string) => void;
  onFinish: () => void;
};

type CreateProjectContext = ActionContext & {
  onStart: () => void;
  onRequestUpdated: (updatedRequest: Request) => void;
  onCreated: () => void;
  onError: (message: string) => void;
  onFinish: () => void;
};

export async function patchRequestStatus(
  nextStatus: RequestStatus,
  {
    token,
    selectedRequest,
    onStart,
    onSuccess,
    onError,
    onFinish,
  }: UpdateContext,
) {
  try {
    onStart();

    const response = await fetch(`${API_URL}/requests/${selectedRequest.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: nextStatus,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.message ?? data?.error ?? "Failed to update request.",
      );
    }

    const updatedRequest: Request = data?.request ?? data;

    onSuccess(updatedRequest);
  } catch (error) {
    console.error("Failed to update request:", error);

    onError(
      error instanceof Error ? error.message : "Failed to update request.",
    );
  } finally {
    onFinish();
  }
}

export async function postRequestProject({
  token,
  selectedRequest,
  onStart,
  onRequestUpdated,
  onCreated,
  onError,
  onFinish,
}: CreateProjectContext) {
  try {
    onStart();

    const response = await fetch(
      `${API_URL}/requests/${selectedRequest.id}/project`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.message ??
          data?.error ??
          "Failed to create project from request.",
      );
    }

    const createdRequest: Request | undefined = data?.request;
    const createdProject = data?.project;

    if (createdRequest) {
      onRequestUpdated(createdRequest);
    }

    onCreated();

    console.log("Project created:", createdProject);
  } catch (error) {
    console.error("Failed to create project:", error);

    onError(
      error instanceof Error
        ? error.message
        : "Failed to create project from request.",
    );
  } finally {
    onFinish();
  }
}

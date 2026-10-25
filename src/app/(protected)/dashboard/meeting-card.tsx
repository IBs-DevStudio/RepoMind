"use client";

import { Presentation, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProject } from "@/hooks/use-project";
import { uploadFile } from "@/lib/firebase";
import { api } from "@/trpc/react";

export default function MeetingCard() {
  const router = useRouter();
  const { projectId } = useProject();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadMeeting = api.project.uploadMeeting.useMutation();

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "audio/*": [".mp3", ".wav", ".m4a"] },
    multiple: false,
    maxSize: 50_000_000,
    noClick: true,
    onDropRejected: () => toast.error("Use an audio file under 50MB"),
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file || !projectId) return;

      setIsUploading(true);
      setProgress(0);
      try {
        const downloadUrl = await uploadFile(file, setProgress);

        uploadMeeting.mutate(
          { projectId, meetingUrl: downloadUrl, name: file.name },
          {
            onSuccess: (meeting) => {
              toast.success("Meeting uploaded successfully");
              router.push("/meetings");
              // The /api/process-meeting route comes in the next chapter.
              void fetch("/api/process-meeting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  meetingUrl: downloadUrl,
                  meetingId: meeting.id,
                  projectId,
                }),
              }).catch(console.error);
            },
            onError: () => toast.error("Failed to upload meeting"),
          },
        );
      } catch (e) {
        console.error(e);
        toast.error("Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
  });

  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center p-10"
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {!isUploading ? (
        <div className="flex flex-col items-center text-center">
          <Presentation className="text-muted-foreground h-10 w-10 animate-bounce" />
          <h3 className="mt-2 text-sm font-semibold">Create a new meeting</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Analyse your meeting with AI.
            <br />
            Drop an audio file or click upload.
          </p>
          <Button className="mt-6" onClick={open} disabled={!projectId}>
            <Upload className="mr-1.5 h-4 w-4" />
            Upload Meeting
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="size-20">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({ pathColor: "#2563eb", textColor: "#2563eb" })}
            />
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            Uploading your meeting...
          </p>
        </div>
      )}
    </Card>
  );
}
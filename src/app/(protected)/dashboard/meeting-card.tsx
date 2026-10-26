"use client";

import {
  FileAudio,
  Headphones,
  Loader2,
  Radio,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/use-project";
import { uploadFile } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

interface MeetingCardProps {
  className?: string;
}

export default function MeetingCard({ className }: MeetingCardProps) {
  const router = useRouter();
  const { projectId } = useProject();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadMeeting = api.project.uploadMeeting.useMutation();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "audio/*": [".mp3", ".wav", ".m4a"] },
    multiple: false,
    maxSize: 50_000_000,
    onDropRejected: () => toast.error("Please upload an audio file under 50MB"),
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
              toast.success("Meeting uploaded! Processing chapters & issues...");
              router.push("/meetings");
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
      className={cn(
        "relative flex flex-col justify-between overflow-hidden border border-border/80 bg-gradient-to-br from-card via-card to-primary/[0.02] shadow-sm transition-all hover:shadow-md",
        className ?? "w-full",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Headphones className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold tracking-tight">
                Meeting Intelligence
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Turn engineering discussions into structured issues & actionable insights.
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            <Radio className="size-3" />
            Audio 
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isUploading ? (
          <div className="space-y-3">
            {/* Interactive Drag & Drop Box */}
            <div
              {...getRootProps()}
              className={cn(
                "group relative flex min-h-[90px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-3 text-center transition-all duration-200",
                isDragActive
                  ? "border-primary bg-primary/5 scale-[0.99]"
                  : "border-muted-foreground/25 bg-background/50 hover:border-primary/50 hover:bg-primary/[0.02]",
              )}
            >
              <input {...getInputProps()} />
              <div className="flex items-center gap-2 text-primary">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                  <FileAudio className="size-3.5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {isDragActive ? "Drop the audio file right here" : "Drop meeting audio, or click to browse"}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Supports MP3, WAV, or M4A audio files up to 50MB
              </p>
            </div>

            {/* AI Automated Extraction Pills */}
            <div className="space-y-1.5 pt-1">
              
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                  <Sparkles className="size-3 text-primary" />
                  Auto-creates action issues
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                  <Radio className="size-3 text-primary" />
                  Captures chapter summaries
                </span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-1">
              <span className="hidden sm:inline-flex text-[11px] text-muted-foreground">
                Powered by AssemblyAI speech model
              </span>

              <Button
                type="button"
                onClick={open}
                disabled={!projectId}
                className="ml-auto gap-2 bg-primary text-primary-foreground shadow-sm hover:opacity-90"
              >
                <Upload className="size-4" />
                <span>Upload Meeting</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[175px] flex-col items-center justify-center space-y-3 rounded-xl border border-primary/20 bg-primary/[0.02] p-4 text-center">
            <div className="size-16">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  pathColor: "var(--primary)",
                  textColor: "var(--foreground)",
                  trailColor: "var(--muted)",
                  textSize: "22px",
                })}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground flex items-center justify-center gap-1.5">
                <Loader2 className="size-3.5 animate-spin text-primary" />
                Uploading & preparing audio...
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground max-w-xs">
                AssemblyAI will automatically analyze chapters and generate issue cards for your project.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

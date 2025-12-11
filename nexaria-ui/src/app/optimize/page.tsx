"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function OptimizePage() {
  const [text, setText] = useState("");
  const [type, setType] = useState("cv");
  const [tone, setTone] = useState("corporate");
  const [language, setLanguage] = useState("en");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setOutput("");

    try {
      const res = await fetch("http://localhost:4000/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          text,
          tone,
          language,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error("Backend error");

      setOutput(data.optimized);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to optimize. Backend unreachable.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

      <h1 className="text-2xl font-semibold">Nexaria Optimize</h1>

      <Card className="p-6 bg-white/85 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700 space-y-6 backdrop-blur-sm">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TEXT INPUT */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Textarea
              placeholder="Write something to optimize..."
              className="min-h-[130px] bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 dark:text-zinc-100"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* 3-COLUMN SETTINGS */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* Type */}
            <div className="space-y-1">
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900">
                  <SelectItem value="cv">CV</SelectItem>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="cover">Cover Letter</SelectItem>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="bio">Bio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tone */}
            <div className="space-y-1">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900">
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="sharp">Sharp</SelectItem>
                  <SelectItem value="youthful">Youthful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-1">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="tr">Türkçe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={loading || !text.trim()}
            className="w-full h-10 text-sm bg-zinc-900 hover:bg-zinc-800 text-white 
          dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? "Optimizing..." : "Optimize"}
          </Button>
        </form>

        {/* OUTPUT */}
        <div className="space-y-2">
          <Label>Output</Label>

          {errorMsg ? (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          ) : (
            <Card className="p-3 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 min-h-[130px] text-sm text-zinc-700 dark:text-zinc-100 whitespace-pre-wrap">
              {output || (
                <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                  Result will appear here…
                </span>
              )}
            </Card>
          )}
        </div>

      </Card>
    </div>
  );
}

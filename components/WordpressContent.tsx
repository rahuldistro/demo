"use client";

export default function WordPressContent({ html }: { html: string }) {
  return (
    <section className="page-section">
      <div
        className="elementor"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

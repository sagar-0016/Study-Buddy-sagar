declare module '@postlight/mercury-parser' {
  interface Mercury {
    parse(
      url: string,
      options?: {
        contentType?: 'html' | 'markdown' | 'text';
        headers?: Record<string, string>;
        html?: string;
      }
    ): Promise<ParseResult>;
  }

  interface ParseResult {
    title: string | null;
    content: string | null;
    author: string | null;
    date_published: string | null;
    lead_image_url: string | null;
    dek: string | null;
    next_page_url: string | null;
    url: string;
    domain: string;
    excerpt: string | null;
    word_count: number;
    direction: 'ltr' | 'rtl';
    total_pages: number;
    rendered_pages: number;
  }

  const MercuryParser: Mercury;
  export = MercuryParser;
}

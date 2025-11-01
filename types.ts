export interface ProductTemplate {
  id: string;
  name: string;
  imageUrl: string;
}

export interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}

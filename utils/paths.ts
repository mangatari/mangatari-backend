// utils/paths.ts
export function normalizeImagePath(path: string) {
    return path.replace(/^\/?uploads\//, 'uploads/');
  }
  
  // Usage when saving files
  // Ensure req is defined or passed as an argument
    const req = { file: { filename: 'example.jpg' } }; // Example definition
    const imagePath = normalizeImagePath(`uploads/${req.file.filename}`);
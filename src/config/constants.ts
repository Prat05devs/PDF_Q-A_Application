export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  acceptedFileTypes: {
    'application/pdf': ['.pdf']
  }
};

export const API_ENDPOINTS = {
  upload: '/api/upload',
  question: '/api/question'
};
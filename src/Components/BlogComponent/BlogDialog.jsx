import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  Paper
} from '@mui/material';
import { Close } from '@mui/icons-material';

const CustomInput = ({ label, value, onChange, type = 'text', multiline = false, rows = 1 }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        mb: 1,
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          resize: 'vertical',
          minHeight: '100px',
          fontFamily: 'inherit',
          '&:focus': {
            borderColor: '#FF9B00',
            boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
          }
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          '&:focus': {
            borderColor: '#FF9B00',
            boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
          }
        }}
      />
    )}
  </Box>
);

const CustomSelect = ({ label, value, onChange, options }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        mb: 1,
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        backgroundSize: '16px',
        '&:focus': {
          borderColor: '#FF9B00',
          boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
        }
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </Box>
);

const ImageUpload = ({ image, onChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        mb: 1,
        fontWeight: 500
      }}
    >
      Blog Image
    </Typography>
    <input
      accept="image/*"
      type="file"
      id="blog-image"
      onChange={onChange}
      style={{ display: 'none' }}
    />
    <label htmlFor="blog-image">
      <Box
        sx={{
          width: '100%',
          height: 200,
          borderRadius: '12px',
          border: '2px dashed rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: image ? `url(${image}) center/cover no-repeat` : 'white',
          '&:hover': {
            borderColor: '#FF9B00',
            backgroundColor: 'rgba(255, 155, 0, 0.05)'
          }
        }}
      >
        {!image && (
          <Typography color="text.secondary">
            Click to upload image
          </Typography>
        )}
      </Box>
    </label>
  </Box>
);

const BlogDialog = ({ open, onClose, blog = null, onSubmit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    description: blog?.description || '',
    content: blog?.content || '',
    image: blog?.image || null,
    category: blog?.category || '',
    status: blog?.status || 'DRAFT'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{
              color: theme.palette.text.primary,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {blog ? 'Edit Blog Post' : 'New Blog Post'}
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              minWidth: 'auto',
              p: 1,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Paper
          sx={{
            p: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <CustomInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <CustomInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={2}
          />

          <CustomInput
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            multiline
            rows={6}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={[
                  { value: 'TRAVEL', label: 'Travel' },
                  { value: 'CAMPING', label: 'Camping' },
                  { value: 'ADVENTURE', label: 'Adventure' },
                  { value: 'TIPS', label: 'Tips & Tricks' }
                ]}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={[
                  { value: 'DRAFT', label: 'Draft' },
                  { value: 'PUBLISHED', label: 'Published' }
                ]}
              />
            </Box>
          </Box>

          <ImageUpload
            image={formData.image}
            onChange={handleImageChange}
          />
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1,
            borderRadius: 2
          }}
        >
          {blog ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogDialog; 
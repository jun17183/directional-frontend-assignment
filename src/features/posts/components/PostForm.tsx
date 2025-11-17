import React from 'react';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Post, CreatePostDto, UpdatePostDto } from '../api/posts.types';
import { postFormSchema, type PostFormData } from '../utils/postFormSchema';
import { CATEGORY_OPTIONS } from '../constants';

interface PostFormProps {
  initialData?: Post;
  onSubmit: (data: CreatePostDto | UpdatePostDto) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
  onBack?: () => void;
  backLabel?: string;
}

export const PostForm = ({ initialData, onSubmit, isLoading = false, submitLabel = '저장', onBack, backLabel }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema) as Resolver<PostFormData>,
    defaultValues: {
      title: initialData?.title ?? '',
      body: initialData?.body ?? '',
      category: initialData?.category ?? 'FREE',
      tags: initialData?.tags ?? [],
    },
  });

  const [tagInput, setTagInput] = React.useState('');
  const tags = watch('tags');

  // 태그 추가
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setValue('tags', [...tags, trimmedTag]);
      setTagInput('');
    }
  };

  // 태그 삭제
  const handleDeleteTag = (tagToDelete: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToDelete)
    );
  };

  // Enter 키로 태그 추가
  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onFormSubmit = (data: PostFormData) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormControl error={!!errors.category} sx={{ width: 200 }}>
        <InputLabel>카테고리</InputLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select 
              {...field} 
              label="카테고리" 
              disabled={isLoading}
              sx={{ 
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
              }}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
      </FormControl>

      <TextField
        {...register('title')}
        label="제목"
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
        disabled={isLoading}
        required
        sx={{
          backgroundColor: 'white',
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        }}
      />

      <TextField
        {...register('body')}
        label="내용"
        fullWidth
        multiline
        rows={10}
        error={!!errors.body}
        helperText={errors.body?.message}
        disabled={isLoading}
        required
        sx={{
          backgroundColor: 'white',
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        }}
      />

      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          태그 (최대 10개)
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              disabled={isLoading}
              size="small"
              color="primary"
              variant="filled"
            />
          ))}
        </Stack>
        <TextField
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleTagInputKeyPress}
          placeholder="태그 입력 후 Enter"
          size="small"
          disabled={isLoading || tags.length >= 10}
          fullWidth
          sx={{ 
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {onBack && (
          <Button 
            type="button"
            variant="outlined"
            onClick={onBack}
            disabled={isLoading}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#616161',
              backgroundColor: '#f5f5f5',
              borderColor: '#bdbdbd',
              '&:hover': {
                backgroundColor: '#e0e0e0',
                borderColor: '#9e9e9e',
                color: '#424242',
              },
              '&:disabled': {
                backgroundColor: '#fafafa',
                borderColor: '#e0e0e0',
                color: '#bdbdbd',
              },
            }}
          >
            {backLabel || '목록으로'}
          </Button>
        )}
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isLoading}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {isLoading ? '저장 중...' : submitLabel}
        </Button>
      </Box>
    </Box>
  );
};


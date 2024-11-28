import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { IComment } from '../interfaces/IComment';

interface CommentProps {
  comment: IComment;
}

export function CommentView({ comment }: CommentProps) {
  return (
      <Card sx={{ marginBottom: 2, maxWidth: 600, margin: 'auto' }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Comment ID: {comment.id}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {comment.description}
          </Typography>
          <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="caption" color="textSecondary">
              Posted on: {new Date(comment.date).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
}
import React from "react";
import {Card, CardContent, Typography, Box, IconButton, Divider, Stack} from "@mui/material";
import {IComment} from "../../interfaces/IComment";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentProps {
  comment: IComment;
  onDelete: (comment_id: number | string) => void;
}

export function CommentView({comment, onDelete}: CommentProps) {
  return (
      <Card
          sx={{
            margin: "auto",
            marginBottom: 2,
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
      >
        <CardContent>
          <Stack direction="row"
                 sx={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                   marginBottom: 2,
                 }}
          >
            <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  lineHeight: 1.6,
                  wordWrap: "break-word",
                }}
            >
              {comment.description}
            </Typography>
            <IconButton
                color="error"
                onClick={() => onDelete(comment.id)}
                sx={{
                  "&:hover": {backgroundColor: "rgba(255, 0, 0, 0.1)"},
                }}
            >
              <DeleteIcon/>
            </IconButton>
          </Stack>

          <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
          >
            <Typography
                variant="caption"
                sx={{color: "#999", fontStyle: "italic"}}
            >
              Posted on: {new Date(comment.date).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
}
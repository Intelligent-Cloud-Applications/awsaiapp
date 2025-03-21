import React, { useState, useEffect } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiShield, FiPlus, FiTrash2, FiList } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Policy = ({
  title,
  setTitle,
  description,
  setDescription,
  content,
  setContent,
  style = {
    color: "white",
    textDecoration: "none"
  }
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </Label>
          <TextInput
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter policy title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter policy description"
            required
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter policy content"
            required
            rows={6}
          />
        </div>
      </div>
    </div>
  );
};

Policy.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  style: PropTypes.shape({
    color: PropTypes.string,
    textDecoration: PropTypes.string
  })
};

export default Policy;
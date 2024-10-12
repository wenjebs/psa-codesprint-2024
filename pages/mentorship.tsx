import React, { useState } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/router';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { TextField, Slider, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

export default function MentorMatching(): JSX.Element {
  const [message, setMessage] = useState('');
  const router = useRouter();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    ethnicity: '',
    role: '',
    hobbies: '',
    techSavviness: 5,
    dataAnalysis: 5,
    projectManagement: 5,
    leadership: 5,
  });

  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle dropdown (ethnicity) change
  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value as string,
    }));
  };

  // Handle slider change for skills
  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue as number,
    }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleFindMatch = async () => {
    const payload = {
      input_value: JSON.stringify({ ...formData, additionalMessage: message }),
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "Prompt-mQCAP": {},
        "ChatInput-YGYYn": {},
        "ChatOutput-xQtQ8": {},
        "ParseData-xCV5X": {},
        "File-4uRPo": {},
        "GoogleGenerativeAIModel-EytoS": {}
      }
    };


    try {
      const response = await fetch(
        "api/mentors",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AstraCS:fcNxeHRLzXbiWkjSioJmSLKO:1b235533606bc556e1d7b8c58ec38b2b44bbea7cab437ec00524434ab4d1c6e0' // Replace with your actual token
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const message = data.outputs[0].outputs[0].results.message.text;

    // Navigate to the mentors page with the message
    router.push({
      pathname: '/mentors',
      query: { message: encodeURIComponent(message) },
    });
      
      console.log('Match found:', data);
      // Handle the response data here (e.g., display the match to the user)
    } catch (error) {
      console.error('Error finding match:', error);
      // Handle errors here (e.g., show an error message to the user)
    }
   
  };  

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white' }} className="overflow-hidden">
      <div className="container mx-auto px-2 py-5 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>

        {/* Header Section */}
        <div className="flex items-center justify-center mb-12">
          <UserGroupIcon className="h-10 w-10 text-purple-400 mr-4" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-glow">
            Mentorship Matching
          </h1>
        </div>

        {/* Introduction Text */}
        <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-white animate-glow">
          Let's get to know you better!
        </h1>

        {/* Personal Details Section */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-8 rounded-lg shadow-lg w-full space-y-8">

            {/* Name Input */}
            <div>
              <p className="text-white font-bold text-xl mb-2">What is your name?</p>
              <TextField
                fullWidth
                type="text"
                name="name"
                label="Enter your name"
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'white' },
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Age Input */}
            <div>
              <p className="text-white font-bold text-xl mb-2">How old are you?</p>
              <TextField
                fullWidth
                type="number"
                name="age"
                label="Enter your age"
                variant="outlined"
                value={formData.age}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'white' },
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Ethnicity Dropdown */}
            <div>
              <p className="text-white font-bold text-xl mb-2">What is your ethnicity?</p>
              <FormControl fullWidth sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <InputLabel id="ethnicity-label" sx={{ color: 'white' }}>Select your ethnicity</InputLabel>
                <Select
                  labelId="ethnicity-label"
                  name="ethnicity"
                  value={formData.ethnicity}
                  label="Ethnicity"
                  onChange={handleSelectChange}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                >
                  <MenuItem value="Asian">Asian</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="Caucasian">Caucasian</MenuItem>
                  <MenuItem value="Hispanic">Hispanic</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
             {/* Department Input */}
             <div>
              <p className="text-white font-bold text-xl mb-2">What department are you in?</p>
              <TextField
                fullWidth
                type="text"
                name="role"
                label="Enter your role"
                variant="outlined"
                value={formData.role}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'white' },
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Role Input */}
            <div>
              <p className="text-white font-bold text-xl mb-2">What is your role?</p>
              <TextField
                fullWidth
                type="text"
                name="role"
                label="Enter your role"
                variant="outlined"
                value={formData.role}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'white' },
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Hobbies Input */}
            <div>
              <p className="text-white font-bold text-xl mb-2">What are your hobbies?</p>
              <TextField
                fullWidth
                type="text"
                name="hobbies"
                label="Enter your hobbies"
                variant="outlined"
                value={formData.hobbies}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'white' },
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Skill Rating Section */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-8 rounded-lg shadow-lg w-full space-y-8">
            <p className="text-white font-bold text-2xl">Rate your skills:</p>

            {/* Tech-Savvy Slider */}
            <div>
              <p className="text-white font-bold mb-2">Tech-Savvy</p>
              <Slider
                value={formData.techSavviness}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="on"
                onChange={handleSliderChange('techSavviness')}
                sx={{
                  color: '#8A2BE2',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-rail': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Data Analysis Slider */}
            <div>
              <p className="text-white font-bold mb-2">Data Analysis</p>
              <Slider
                value={formData.dataAnalysis}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="on"
                onChange={handleSliderChange('dataAnalysis')}
                sx={{
                  color: '#8A2BE2',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-rail': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Project Management Slider */}
            <div>
              <p className="text-white font-bold mb-2">Project Management</p>
              <Slider
                value={formData.projectManagement}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="on"
                onChange={handleSliderChange('projectManagement')}
                sx={{
                  color: '#8A2BE2',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-rail': {
                    color: 'white',
                  },
                }}
              />
            </div>

            {/* Leadership Slider */}
            <div>
              <p className="text-white font-bold mb-2">Leadership</p>
              <Slider
                value={formData.leadership}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="on"
                onChange={handleSliderChange('leadership')}
                sx={{
                  color: '#8A2BE2',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#8A2BE2',
                  },
                  '& .MuiSlider-rail': {
                    color: 'white',
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Additional Message Input */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-2xl font-bold text-center mb-8 bg-clip-text text-white animate-glow">
            Describe any relevant experiences which might make you a good mentor?
          </p>
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg shadow-xl p-6 w-full">
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Enter your details here..."
              value={message}
              onChange={handleMessageChange}
              InputProps={{
                style: { color: 'white' }, // To match your current design
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Additional Message Input */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-2xl font-bold text-center mb-8 bg-clip-text text-white animate-glow">
            What are you looking for in a mentor?
          </p>
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg shadow-xl p-6 w-full">
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Enter your details here..."
              value={message}
              onChange={handleMessageChange}
              InputProps={{
                style: { color: 'white' }, // To match your current design
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFindMatch}
            sx={{
              backgroundColor: 'blue',
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
          >
            Find a Match
          </Button>
        </div>
      </div>
    </div>
  );
}
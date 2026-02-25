const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDGXw8P9vYqE_4KqZ5xN7mJ2fL1hR3tK8s';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function callGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return '';
  }
}

// 1. Auto-Department Assignment
export async function assignDepartment(title: string, description: string, departments: string[]): Promise<string> {
  const prompt = `You are an AI assistant for a college complaint system. Based on the complaint, assign it to the most appropriate department.

Available Departments: ${departments.join(', ')}

Complaint Title: ${title}
Complaint Description: ${description}

Return ONLY the department name from the list above. If unsure, return "Administration".`;

  const result = await callGemini(prompt);
  const assigned = result.trim();
  
  // Validate department exists
  return departments.includes(assigned) ? assigned : 'Administration';
}

// 2. Duplicate Complaint Detection
export async function checkDuplicate(
  newComplaint: { title: string; description: string },
  existingComplaints: Array<{ title: string; description: string; id: string; createdAt: string }>
): Promise<{ isDuplicate: boolean; similarComplaint?: any; similarity?: string }> {
  if (existingComplaints.length === 0) {
    return { isDuplicate: false };
  }

  const recentComplaints = existingComplaints.slice(0, 10); // Check last 10 complaints
  
  const prompt = `You are an AI assistant detecting duplicate complaints in a college system.

New Complaint:
Title: ${newComplaint.title}
Description: ${newComplaint.description}

Existing Complaints:
${recentComplaints.map((c, i) => `${i + 1}. Title: ${c.title}\n   Description: ${c.description}\n   Filed: ${new Date(c.createdAt).toLocaleDateString()}`).join('\n\n')}

Analyze if the new complaint is similar/duplicate to any existing complaint.
If similar, respond with: "DUPLICATE|<complaint_number>|<similarity_reason>"
If not similar, respond with: "UNIQUE"

Example: "DUPLICATE|3|Both complaints are about AC not working in the same room"`;

  const result = await callGemini(prompt);
  
  if (result.startsWith('DUPLICATE')) {
    const parts = result.split('|');
    const complaintIndex = parseInt(parts[1]) - 1;
    const similarity = parts[2] || 'Similar complaint found';
    
    return {
      isDuplicate: true,
      similarComplaint: recentComplaints[complaintIndex],
      similarity
    };
  }

  return { isDuplicate: false };
}

// 3. Smart Response Suggestions
export async function generateResponseSuggestions(
  complaint: { title: string; description: string; category: string }
): Promise<string[]> {
  const prompt = `You are an AI assistant helping college admins respond to student complaints.

Complaint Category: ${complaint.category}
Complaint Title: ${complaint.title}
Complaint Description: ${complaint.description}

Generate 3 professional response templates that an admin can use to reply to this complaint.
Each response should be helpful, empathetic, and action-oriented.

Format your response as:
1. [First response]
2. [Second response]
3. [Third response]

Keep each response under 100 words.`;

  const result = await callGemini(prompt);
  
  // Parse responses
  const responses = result
    .split(/\d+\.\s+/)
    .filter(r => r.trim().length > 0)
    .map(r => r.trim())
    .slice(0, 3);

  // Fallback responses if AI fails
  if (responses.length === 0) {
    return [
      "Thank you for reporting this issue. We have assigned it to the relevant department and will update you within 24-48 hours.",
      "We acknowledge your complaint and understand your concern. Our team is investigating this matter and will take appropriate action soon.",
      "Your complaint has been received and logged. We will prioritize this issue and keep you informed about the progress."
    ];
  }

  return responses;
}

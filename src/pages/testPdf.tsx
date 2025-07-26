// StyledFormToPDF.tsx
import React, { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const StyledFormToPDF: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const exportPDF = async () => {
    if (!formRef.current) return;

    const canvas = await html2canvas(formRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("styled_form.pdf");
  };

  return (
    <div>
      <div ref={formRef} style={{ padding: 20, border: '1px solid gray', width: 300, marginBottom: 20 }}>
        <h3>Preview</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Message:</strong> {formData.message}</p>
      </div>

      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <textarea name="message" placeholder="Message" onChange={handleChange} /><br />
      <button onClick={exportPDF}>Export Styled PDF</button>
    </div>
  );
};

export default StyledFormToPDF;

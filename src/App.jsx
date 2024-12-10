import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:4000/upload', formData)
      .then(res => console.log("Image uploaded successfully", res))
      .catch(err => console.log("Error while uploading image:", err));
  };

  useEffect(() => {
    axios.get("http://localhost:4000/getImage")
      .then(res => {
        if (res.data.length > 0) {
          setImage(res.data[0].image); // Adjust field name to match backend response
        }
      })
      .catch(err => console.log("Error fetching image:", err));
  }, []); // Dependency array added

  return (
    <div className="App">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {image && (
        <img src={`http://localhost:4000/images/${image}`} alt="Uploaded" />
      )}
    </div>
  );
}

export default App;

import { useState } from 'react'
import './InputHandling.css'

function InputHandling() {
  const [text, setText] = useState('')

  const handleInputChange = (event) => {
    setText(event.target.value)
  }

  const characterCount = text.length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length

  return (
    <section className="input-card">
      <p className="eyebrow">Task 2</p>
      <h1>Input Handling</h1>

      <label className="field-label" htmlFor="message-input">
        Type your text
      </label>
      <input
        id="message-input"
        className="text-input"
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />

      <label className="field-label" htmlFor="preview-output">
        Live preview
      </label>
      <textarea
        id="preview-output"
        className="preview-output"
        value={text}
        placeholder="Start typing..."
        readOnly
      />

      <div className="stats-row">
        <div className="stat-box">
          <span>{characterCount}</span>
          Characters
        </div>
        <div className="stat-box">
          <span>{wordCount}</span>
          Words
        </div>
      </div>
    </section>
  )
}

export default InputHandling

import React, { useState, useEffect } from "react";

const MeetingForm = ({
  addTask,
  editingTask,
  updateTask,
  cancelEdit
}) => {

  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [status, setStatus] = useState("Pending");

  const [engagement, setEngagement] =
    useState(70);

  const [participation, setParticipation] =
    useState(70);

  const [interruptions, setInterruptions] =
    useState(2);

  const [clarity, setClarity] =
    useState(70);

  const [duration, setDuration] =
    useState(30);

  /* ================= DETECT EDIT MODE ================= */

  const isEditing = editingTask !== null;

  /* ================= AUTO-FILL ON EDIT ================= */

  useEffect(() => {

    if (editingTask) {

      setTitle(editingTask.title || "");
      setSpeaker(editingTask.speaker || "");
      setStatus(editingTask.status || "Pending");

      setEngagement(editingTask.engagement || 70);
      setParticipation(editingTask.participation || 70);
      setInterruptions(editingTask.interruptions || 2);
      setClarity(editingTask.clarity || 70);
      setDuration(editingTask.duration || 30);

    }

    else {

      /* Reset to defaults when edit is cancelled */

      setTitle("");
      setSpeaker("");
      setStatus("Pending");

      setEngagement(70);
      setParticipation(70);
      setInterruptions(2);
      setClarity(70);
      setDuration(30);

    }

  }, [editingTask]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      title.trim() === "" ||
      speaker.trim() === ""
    ) {

      alert("Please fill all fields");

      return;

    }

    if (title.length < 3) {

      alert(
        "Meeting topic must contain at least 3 characters"
      );

      return;

    }

    const newTask = {

      title: title,

      speaker: speaker,

      status: status,

      engagement: Number(engagement),

      participation: Number(participation),

      interruptions: Number(interruptions),

      clarity: Number(clarity),

      duration: Number(duration)

    };

    /* EDIT MODE → update | ADD MODE → add */

    if (isEditing) {

      await updateTask(editingTask._id, newTask);

    }

    else {

      await addTask(newTask);

    }

    /* RESET FORM */

    setTitle("");
    setSpeaker("");
    setStatus("Pending");

    setEngagement(70);
    setParticipation(70);
    setInterruptions(2);
    setClarity(70);
    setDuration(30);

  };

  return (

    <div className="meeting-behaviour-section">

      {/* LEFT SIDE */}

      <div className="behaviour-info">

        <div className="info-card">

          <h2>
            AI Meeting Behavior Analysis
          </h2>

          <p>

            MeetPulse AI analyzes
            communication patterns,
            engagement levels,
            participation balance,
            interruptions,
            and decision clarity
            during meetings.

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="meeting-form-box">

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Meeting Topic"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Speaker Name"
            value={speaker}
            onChange={(e) =>
              setSpeaker(e.target.value)
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>
              Pending
            </option>

            <option>
              Completed
            </option>

          </select>

          {/* ENGAGEMENT */}

          <div className="slider-box">

            <label>
              Engagement Level :
              {engagement}%
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={engagement}
              onChange={(e) =>
                setEngagement(e.target.value)
              }
            />

          </div>

          {/* PARTICIPATION */}

          <div className="slider-box">

            <label>
              Participation Balance :
              {participation}%
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={participation}
              onChange={(e) =>
                setParticipation(e.target.value)
              }
            />

          </div>

          {/* CLARITY */}

          <div className="slider-box">

            <label>
              Decision Clarity :
              {clarity}%
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={clarity}
              onChange={(e) =>
                setClarity(e.target.value)
              }
            />

          </div>

          {/* INTERRUPTIONS */}

          <div className="slider-box">

            <label>
              Interruptions :
              {interruptions}
            </label>

            <input
              type="range"
              min="0"
              max="10"
              value={interruptions}
              onChange={(e) =>
                setInterruptions(e.target.value)
              }
            />

          </div>

          {/* DURATION */}

          <div className="slider-box">

            <label>
              Meeting Duration :
              {duration}
            </label>

            <input
              type="number"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
            />

          </div>

          {/* DYNAMIC BUTTONS */}

          <button type="submit">

            {isEditing
              ? "Update Meeting"
              : "Analyze Meeting"}

          </button>

          {isEditing && (

            <button
              type="button"
              className="cancel-btn"
              onClick={cancelEdit}
            >

              Cancel

            </button>

          )}

        </form>

      </div>

    </div>

  );

};

export default MeetingForm;
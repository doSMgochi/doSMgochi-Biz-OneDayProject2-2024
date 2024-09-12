"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };
  const [formData, setFormData] = useState({
    type: "",
    start_time: "",
    end_time: "",
    current_distance: "",
    cost: "",
    location: "",
  });
  const [listData, setListData] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.type ||
      !formData.start_time ||
      !formData.end_time ||
      !formData.current_distance ||
      !formData.cost ||
      !formData.location
    ) {
      alert("모든 값을 입력해주세요.");
      return;
    }
    try {
      const preparedData = {
        ...formData,
        current_distance: parseInt(formData.current_distance, 10),
        cost: parseInt(formData.cost, 10),
      };
      const response = await fetch("/api/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });
      if (response.ok) {
        fetchListData();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchListData = async () => {
    try {
      const response = await fetch("/api/list");
      const data = await response.json();
      setListData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (no) => {
    try {
      const response = await fetch(`/api/delete/${no}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchListData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.fs4x}>MY CAR MANAGER</h1>
      <form onSubmit={handleSubmit} className={styles.form_box}>
        <select
          className={styles.input_box}
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="" disabled>
            구분 선택
          </option>
          <option value="연료 주유">연료 주유</option>
          <option value="정비 및 수리">정비 및 수리</option>
          <option value="주행 거리">주행 거리</option>
          <option value="주차">주차</option>
          <option value="통행료">통행료</option>
          <option value="보험">보험</option>
          <option value="사고">사고</option>
          <option value="세차">세차</option>
          <option value="타이어 교체">타이어 교체</option>
          <option value="기타 비용">기타 비용</option>
        </select>
        <input
          className={styles.input_box}
          type="text"
          name="start_time"
          placeholder="시작일시"
          value={formData.start_time}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) =>
            (e.target.type = formData.start_time ? "date" : "text")
          }
          onChange={handleChange}
        />

        <input
          className={styles.input_box}
          type="text"
          name="end_time"
          placeholder="종료일시"
          value={formData.end_time}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = formData.end_time ? "date" : "text")}
          onChange={handleChange}
        />
        <input
          className={styles.input_box}
          type="text"
          name="current_distance"
          placeholder="현재거리"
          value={formData.current_distance}
          onChange={handleChange}
        />
        <input
          className={styles.input_box}
          type="text"
          name="cost"
          placeholder="소요비용"
          value={formData.cost}
          onChange={handleChange}
        />
        <input
          className={styles.input_box}
          type="text"
          name="location"
          placeholder="장소"
          value={formData.location}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submit_button}>
          작성
        </button>
      </form>

      <table className={styles.table_box}>
        <thead>
          <tr>
            <th>No</th>
            <th>구분</th>
            <th>시작일시</th>
            <th>종료일시</th>
            <th>현재거리</th>
            <th>소요비용</th>
            <th>장소</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr
              key={item.no}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleDelete(item.no)}
            >
              {hoveredRow === index ? (
                <td colSpan="7" className={styles.delete_row}>
                  삭제
                </td>
              ) : (
                <>
                  <td>{item.no}</td>
                  <td>{item.type}</td>
                  <td>{item.start_time}</td>
                  <td>{item.end_time}</td>
                  <td>{item.current_distance}</td>
                  <td>{item.cost}</td>
                  <td>{item.location}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

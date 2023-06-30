/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Unauthorized from "./Unauthorized"
import Loading from "./Loading"
import { apiUrl, apiPort } from "../setting"

function Attendance() {
  const [employee, setEmployee] = useState(null)
  const [time, setTime] = useState(new Date())
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isNotAuth, setIsNotAuth] = useState(false)

  useEffect(() => {
    const employeeId = localStorage.getItem("employee-id")
    fetch(`http://${apiUrl}:${apiPort}/api/employees/${employeeId}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((content) => setEmployee(content.data))
      .catch(() => setIsNotAuth(true))

    if (employee) {
      setIsLoading(false)
    }

    document.title = "HRIS - Kehadiran"

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [employee])

  const postAttendance = async () => {
    const today = new Date().toISOString().split("T")[0]
    const hasAttendanceToday = employee.attendances.some(
      (attendance) => attendance.attendance_time.split("T")[0] === today
    )

    if (hasAttendanceToday) {
      alert("Anda sudah absen hari ini")
      return
    }

    const currentHour = new Date().getHours()

    if (currentHour < 7) {
      alert("Belum saatnya absen")
      return
    }

    const response = await fetch(`http://${apiUrl}:${apiPort}/api/attendances`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        attendance_time: new Date().toISOString(),
        status: status,
        employee_id: localStorage.getItem("employee-id"),
      }),
    })

    console.log(localStorage.getItem("employee-id"))

    if (response.ok) {
      alert("Absen berhasil")
    } else {
      alert(`Absen gagal, terjadi kesalahan, Error (${response.statusText})`)
    }
  }

  const getDate = () => {
    return time ? time.toLocaleDateString() : "Loading"
  }

  const getTime = () => {
    return time ? time.toLocaleTimeString() : "Loading"
  }

  const getEmployeeAttendances = () => {
    return employee ? employee.attendances : []
  }

  if (isLoading) {
    return <Loading />
  } else if (isNotAuth) {
    return <Unauthorized />
  } else {
    return (
      <div className="d-flex">
        <Sidebar />
        <main
          className="p-4 w-75"
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          <h2 className="mt-4">Kehadiran</h2>
          <hr />
          <form className="bg-light p-3 shadow-sm">
            <table className="w-100">
              <tbody>
                <tr>
                  <th scope="row" className="col-2 py-2">
                    Tanggal
                  </th>
                  <td>{getDate()}</td>
                </tr>
                <tr>
                  <th scope="row" className="col-2 py-2">
                    Waktu
                  </th>
                  <td>{getTime()}</td>
                </tr>
                <tr>
                  <th scope="row" className="col-2 py-2">
                    Status
                  </th>
                  <td>
                    <select
                      className="form-select form-select-sm w-50"
                      aria-label="Default select example"
                      defaultValue={time.getHours() > 9 ? "Telat" : "Hadir"}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {time.getHours() < 9 ? (
                        <>
                          <option value="Hadir">Hadir</option>
                          <option value="Telat">Telat</option>
                          <option value="Izin">Izin</option>
                          <option value="Alfa">Alfa</option>
                        </>
                      ) : time.getHours() > 9 ? (
                        <>
                          <option value="Alfa">Alfa</option>
                          <option value="Izin">Izin</option>
                        </>
                      ) : (
                        <>
                          <option value="Alfa">Alfa</option>
                        </>
                      )}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className="btn btn-primary mt-3 w-25"
              onClick={postAttendance}
            >
              Simpan
            </button>
          </form>
          <h2 className="mt-4">Rekap Kehadiran</h2>
          <hr />
          <table className="w-100 bg-light shadow-sm table table-striped">
            <thead>
              <tr className="text-center">
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getEmployeeAttendances().length > 0 ? (
                getEmployeeAttendances().map((attendance) => (
                  <tr key={attendance.id} className="text-center">
                    <td>
                      {new Date(attendance.attendance_time).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      {new Date(attendance.attendance_time).toLocaleTimeString(
                        "en-GB"
                      )}
                    </td>
                    <td>{attendance.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Belum ada data yang tersedia</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}

export default Attendance

import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Unauthorized from "./Unauthorized"
import Loading from "./Loading"
import { apiUrl, apiPort } from "../setting"

function Dashboard() {
  const [employee, setEmployee] = useState(null)
  const [payrolls, setPayrolls] = useState(null)
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

    fetch(`http://${apiUrl}:${apiPort}/api/payrolls`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((content) => setPayrolls(content.data))
      .catch(() => setIsNotAuth(true))

      if (employee && payrolls) {
        setIsLoading(false)
      }

    document.title = "HRIS - Dashboard"
  }, [employee, payrolls])

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
          <h2 className="mt-4">Selamat Datang, {employee.name}</h2>
          <hr />
          <div className="container p-0">
            <div className="row">
              <div className="col me-3">
                <div className="card-title d-flex justify-content-between">
                  <h4>Pendapatan Terakhir</h4>
                  <a href="/payroll">lihat selengkapnya...</a>
                </div>
                <hr />
                <table className="table table-striped w-100 shadow-sm">
                  <thead>
                    <tr className="text-center">
                      <th>Periode</th>
                      <th>Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrolls.length > 0 ? (
                      payrolls.map((payroll) => (
                        <tr key={payroll.id} className="text-center">
                          <td>
                            {new Date(payroll.payroll_date).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>
                            Rp.{" "}
                            {payroll.salary + payroll.allowance - payroll.tax}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Belum ada data yang tersedia</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="cards my-3">
            <div className="card-title d-flex justify-content-between">
              <h4>Riwayat Kehadiran</h4>
              <a href="/attendance">lihat selengkapnya...</a>
            </div>
            <hr />
            <table className="table table-striped w-100 text-center shadow-sm">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {getEmployeeAttendances().length > 0 ? (
                  getEmployeeAttendances().map((attendance) => (
                    <tr key={attendance.id} className="text-center">
                      <td>
                        {new Date(
                          attendance.attendance_time
                        ).toLocaleDateString("en-GB")}
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
          </div>
        </main>
      </div>
    )
  }
}

export default Dashboard

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Unauthorized from "./Unauthorized"
import Loading from "./Loading"
import { apiUrl, apiPort } from "../setting"

function Payroll() {
  const [employee, setEmployee] = useState(null)
  const [payrolls, setPayrolls] = useState(null)
  const [time, setTime] = useState(new Date())
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

    document.title = "HRIS - Payroll"

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time, employee, payrolls])

  console.log(payrolls)
  const latestPayroll =
    payrolls && payrolls.length > 0
      ? payrolls.sort(
          (a, b) => new Date(b.payroll_date) - new Date(a.payroll_date)
        )[0]
      : null

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
          <h2 className="mt-4">Informasi Keuangan</h2>
          <hr />
          <div className="bg-light p-3 my-3 shadow-sm">
            <table className="w-100">
              <tbody>
                <tr>
                  <th scope="row" className="col-4">
                    Periode
                  </th>
                  <td>
                    {time.toLocaleString("default", { month: "long" })},{" "}
                    {time.getFullYear()}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="col-4">
                    ID Karyawan
                  </th>
                  <td>{employee.tag_id}</td>
                </tr>
                <tr>
                  <th scope="row" className="col-4">
                    Nama Karyawan
                  </th>
                  <td>{employee.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {latestPayroll && (
            <>
              <h5 className="mt-4">Penerimaan</h5>
              <hr />
              <table className="table table-striped w-100 bg-light my-3 shadow-sm">
                <tbody>
                  <tr>
                    <th scope="row" className="px-3">
                      Gaji Pokok
                    </th>
                    <td className="text-end px-3">{latestPayroll.salary}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-3">
                      Tunjangan
                    </th>
                    <td className="text-end px-3">{latestPayroll.allowance}</td>
                  </tr>
                  <tr className="bg-secondary">
                    <th scope="row" className="px-3 py-2">
                      Total Penerimaan
                    </th>
                    <td className="text-end fw-bold px-3 py-2">
                      {latestPayroll.salary + latestPayroll.allowance}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5 className="mt-4">Potongan</h5>
              <hr />
              <table className="table table-striped w-100 bg-light my-3 shadow-sm">
                <tbody>
                  <tr>
                    <th scope="row" className="px-3">
                      Pajak
                    </th>
                    <td className="text-end px-3">{latestPayroll.tax}</td>
                  </tr>
                  <tr className="bg-secondary">
                    <th scope="row" className="px-3 py-2">
                      Total Potongan
                    </th>
                    <td className="text-end fw-bold px-3 py-2">
                      {latestPayroll.tax}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5 className="mt-4">Total Gaji</h5>
              <hr />
              <table className="w-100 bg-light my-3 shadow-sm">
                <tr className="bg-danger text-light">
                  <th scope="row" className="p-3">
                    IDR
                  </th>
                  <td className="text-end fw-bold p-3">
                    {latestPayroll.salary +
                      latestPayroll.allowance -
                      latestPayroll.tax}
                  </td>
                </tr>
              </table>
            </>
          )}
        </main>
      </div>
    )
  }
}

export default Payroll

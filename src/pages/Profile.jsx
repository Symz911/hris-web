import ProfileModal from "../components/ProfileModal"
import Sidebar from "../components/Sidebar"
import Loading from "../pages/Loading"
import { useEffect, useState } from "react"
import Unauthorized from "./Unauthorized"
import { apiUrl, apiPort } from "../setting"

function Profile() {
  const [employee, setEmployee] = useState(null)
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

    document.title = "HRIS - Dashboard"
  }, [employee])

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
          <h2 className="mt-4">Profil</h2>
          <hr />
          <div className="bg-light p-3 my-3 shadow-sm">
            <div className="containers">
              <hr />
              <table className="table table-striped w-100">
                <tbody>
                  <tr>
                    <th scope="row" className="col-4">
                      Nama
                    </th>
                    <td>{employee.name}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      Perusahaan
                    </th>
                    <td>PT. PANN Maritim</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      ID Karyawan
                    </th>
                    <td>{employee.tag_id}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      Tanggal Lahir
                    </th>
                    <td>{new Date(employee.birthdate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      No. Handphone
                    </th>
                    <td>{employee.phone_number}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      Alamat
                    </th>
                    <td>{employee.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary mt-3 w-auto"
                data-bs-toggle="modal"
                data-bs-target="#changeProfile"
              >
                Ubah Profil
              </button>
            </div>
          </div>
        </main>
        <ProfileModal />
      </div>
    )
  }
}

export default Profile

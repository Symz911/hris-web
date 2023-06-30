import { useState } from "react"
import { Navigate } from "react-router-dom"
import { apiUrl, apiPort } from "../setting"

function ProfileModal() {
  const [tagId, setTagId] = useState("")
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [samePassword, setSamePassword] = useState("")
  const [address, setAddress] = useState("")
  const [redirect, setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    const parsedBirthdate = birthdate ? new Date(birthdate).toISOString() : ""

    if (password !== samePassword) {
      alert("Passwords tidak sama!")
      return false
    }

    const employeeId = localStorage.getItem("employee-id")
    console.log(employeeId)

    const response = await fetch(
      `http://${apiUrl}:${apiPort}/api/employees/${employeeId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          tag_id: tagId,
          name: name,
          birthdate: parsedBirthdate,
          phone_number: phoneNumber,
          password: password,
          address: address,
        }),
      }
    )

    if (response.ok) {
      alert("Update data berhasil")
      setRedirect(true)
    } else {
      alert(
        `Update data gagal, terjadi kesalahan, Error (${response.statusText})`
      )
    }
  }

  if (redirect) {
    return <Navigate to={"/profile"} />
  }

  return (
    <div
      className="modal fade"
      id="changeProfile"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Ubah Profil
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={submit}>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="inputKaryawanID" className="form-label">
                    ID Karyawan
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="inputKaryawanID"
                    placeholder="ID Karyawan"
                    required
                    onChange={(e) => setTagId(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="inputName" className="form-label">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="inputName"
                    placeholder="Nama Lengkap"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="inputBirthDate" className="form-label">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="inputBirthDate"
                  required
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="inputPhone" className="form-label">
                  Nomor Hanphone
                </label>
                <div className="input-group mb-2">
                  <span className="input-group-text">+62</span>
                  <input
                    type="tel"
                    className="form-control form-control-sm"
                    placeholder="xxx xxxx xxxx"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="inputPassword"
                    placeholder="Password Baru"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="inputConfirmPassword" className="form-label">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="inputConfirmPassword"
                    placeholder="Ketik Ulang Password"
                    required
                    onChange={(e) => setSamePassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputAddres" className="form-label">
                  Alamat
                </label>
                <textarea
                  className="form-control form-control-sm"
                  id="inputAddres"
                  rows="2"
                  placeholder="Alamat Lengkap Baru"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal

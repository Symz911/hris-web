import { useState } from "react"
import { Navigate } from "react-router-dom"
import { apiUrl, apiPort } from "../setting"

function Register() {
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

    const response = await fetch(`http://${apiUrl}:${apiPort}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tag_id: tagId,
        name: name,
        birthdate: parsedBirthdate,
        phone_number: phoneNumber,
        password: password,
        address: address,
      }),
    })

    if (response.ok) {
      alert("Registrasi berhasil, anda akan dialihkan ke halaman Login")
      setRedirect(true)
    } else {
      alert(
        `Registrasi gagal, terjadi kesalahan, Error (${response.statusText})`
      )
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 mt-2 mx-5 shadow w-50 bg-light">
        <div className="card-body align-items-center">
          <h4 className="card-title text-center mb-3">Sign Up</h4>
          <form onSubmit={submit}>
            <div className="row mb-2">
              <div className="col">
                <label htmlFor="inputKaryawanID" className="form-label">
                  ID Karyawan
                </label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
                className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                className="form-control"
                id="inputAddres"
                rows={2}
                placeholder="Alamat Lengkap"
                required
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid gap-2 col-5 mx-auto mt-2 mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="form_text text-center text-secondary">
              Sudah punya akun? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

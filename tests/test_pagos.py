import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestPagos(unittest.TestCase):

    def test_pago_reserva_inexistente(self):

        response = client.post(
            "/pagos/",
            json={
                "reserva_id": 999,
                "monto": 100,
                "metodo_pago": "Tarjeta"
            }
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json()["detail"],
            "Reserva no encontrada"
        )

    def test_registrar_pago_correctamente(self):

        usuario = client.post(
            "/registro",
            json={
                "nombre": "Juan",
                "email": "juan@test.com",
                "telefono": "0999999999",
                "password": "123456",
                "rol": "cliente"
            }
        )

        usuario_id = usuario.json()["id"]

        habitacion = client.post(
            "/habitaciones",
            json={
                "numero": 500,
                "tipo": "Simple",
                "precio": 50,
                "disponible": True
            }
        )

        habitacion_id = habitacion.json()["id"]

        reserva = client.post(
            "/reservas/",
            json={
                "habitacion_id": habitacion_id,
                "usuario_id": usuario_id,
                "fecha_inicio": "2026-07-01",
                "fecha_fin": "2026-07-05"
            }
        )

        self.assertEqual(reserva.status_code, 201)

        reserva_id = reserva.json()["id"]

        pago = client.post(
            "/pagos/",
            json={
                "reserva_id": reserva_id,
                "monto": 200,
                "metodo_pago": "Tarjeta"
            }
        )

        self.assertEqual(pago.status_code, 200)

        datos = pago.json()

        self.assertEqual(datos["reserva_id"], reserva_id)
        self.assertEqual(datos["monto"], 200)
        self.assertEqual(datos["metodo_pago"], "Tarjeta")
        self.assertIsNotNone(datos["fecha_pago"])


if __name__ == "__main__":
    unittest.main()
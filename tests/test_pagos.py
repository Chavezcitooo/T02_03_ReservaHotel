import unittest
import uuid
import random
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestPagos(unittest.TestCase):

    def test_pago_reserva_inexistente(self):
        # Intentamos pagar una reserva con un ID altísimo que seguro no existe
        response = client.post(
            "/pagos/",
            json={
                "reserva_id": 999999, 
                "monto": 100,
                "metodo_pago": "Tarjeta"
            }
        )

        # Debería saltar un error 404
        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json()["detail"],
            "Reserva no encontrada"
        )

    def test_registrar_pago_correctamente(self):
        # Correo dinámico para evitar el error de "usuario ya existe" si corremos el test varias veces
        correo = f"{uuid.uuid4()}@test.com"
        usuario = client.post(
            "/registro",
            json={
                "nombre": "Mario",
                "email": correo,
                "telefono": "0999999999",
                "password": "12345678",
                "rol": "cliente"
            }
        )
        
        usuario_id = usuario.json()["id"]
        numero_habitacion = random.randint(1000, 9999)

        habitacion = client.post(
            "/habitaciones",
            json={
                "numero": numero_habitacion,
                "tipo": "Simple",
                "precio": 50,
                "disponible": True
            }
        )

        habitacion_id = habitacion.json()["id"]

        # Ahora sí, reservamos la habitación nueva
        reserva = client.post(
            "/reservas/",
            json={
                "habitacion_id": habitacion_id,
                "usuario_id": usuario_id,
                "fecha_inicio": "2026-07-01",
                "fecha_fin": "2026-07-05"
            }
        )
        #Print para ver el error
        print(f"\n--- LOG DE ERROR: {reserva.json()} ---\n")
        
        self.assertEqual(reserva.status_code, 201)

        reserva_id = reserva.json()["id"]

        # Finalmente mandamos el pago
        pago = client.post(
            "/pagos/",
            json={
                "reserva_id": reserva_id,
                "monto": 200,
                "metodo_pago": "Tarjeta"
            }
        )

        # Validamos que todo haya guardado bien
        self.assertEqual(pago.status_code, 200)

        datos = pago.json()
        self.assertEqual(datos["reserva_id"], reserva_id)
        self.assertEqual(datos["monto"], 200)
        self.assertEqual(datos["metodo_pago"], "Tarjeta")
        self.assertIsNotNone(datos["fecha_pago"])


if __name__ == "__main__":
    unittest.main()
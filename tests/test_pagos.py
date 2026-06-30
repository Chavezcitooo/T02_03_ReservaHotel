import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestPagos(unittest.TestCase):
    pass

if __name__ == "__main__":
    unittest.main()

def test_pago_reserva_inexistente(self):

    response = client.post(
        "/pagos/",
        json={
            "reserva_id":999,
            "monto":100,
            "metodo_pago":"Tarjeta"
        }
    )

    self.assertEqual(response.status_code,404)
import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestPagos(unittest.TestCase):
    pass

if __name__ == "__main__":
    unittest.main()

def test_registrar_pago_correctamente(self):
    # Crear usuario
    # Crear habitación
    # Crear reserva
    # Registrar pago

    self.assertEqual(pago.status_code, 200)

    
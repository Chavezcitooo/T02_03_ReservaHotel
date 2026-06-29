import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestHabitaciones(unittest.TestCase):

    def setUp(self):
        from app.habitaciones import habitaciones
        habitaciones.clear()

    def test_crear_habitacion(self):
        response = client.post("/habitaciones", json={
            "numero": 101,
            "tipo": "simple",
            "precio": 100.0,
            "disponible": True
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["numero"], 101)

    def test_listar_habitaciones(self):
        client.post("/habitaciones", json={
            "numero": 101,
            "tipo": "simple",
            "precio": 100.0,
            "disponible": True
        })

        response = client.get("/habitaciones")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_obtener_habitacion(self):
        client.post("/habitaciones", json={
            "numero": 101,
            "tipo": "simple",
            "precio": 100.0,
            "disponible": True
        })

        response = client.get("/habitaciones/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], 1)

    def test_actualizar_habitacion(self):
        client.post("/habitaciones", json={
            "numero": 101,
            "tipo": "simple",
            "precio": 100.0,
            "disponible": True
        })

        response = client.put("/habitaciones/1", json={
            "numero": 101,
            "tipo": "doble",
            "precio": 150.0,
            "disponible": False
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["tipo"], "doble")

    def test_eliminar_habitacion(self):
        client.post("/habitaciones", json={
            "numero": 101,
            "tipo": "simple",
            "precio": 100.0,
            "disponible": True
        })

        response = client.delete("/habitaciones/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["mensaje"], "Eliminada")
    def test_habitacion_no_existe(self):
        response = client.get("/habitaciones/999")
        self.assertEqual(response.status_code, 404)

if __name__ == "__main__":
    unittest.main()
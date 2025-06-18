from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import json

# Setup headless Chrome
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=options)

BASE_URL = "http://54.161.147.186:5000/api/products"

def test_1_load_products_endpoint():
    driver.get(BASE_URL)
    time.sleep(1)
    body = driver.find_element("tag name", "body").text
    assert body != "", "❌ Empty response from API"
    print("✅ test_1_load_products_endpoint passed")

def test_2_response_is_valid_json():
    body = driver.find_element("tag name", "body").text
    try:
        data = json.loads(body)
        assert isinstance(data, list), "❌ Response is not a list"
        print("✅ test_2_response_is_valid_json passed")
    except Exception:
        raise AssertionError("❌ Response is not valid JSON")

def test_3_contains_pizza_or_burger():
    body = driver.find_element("tag name", "body").text
    assert "Pizza" in body or "Burger" in body, "❌ Expected food items not found"
    print("✅ test_3_contains_pizza_or_burger passed")

def test_4_contains_product_id():
    data = json.loads(driver.find_element("tag name", "body").text)
    assert any("id" in product for product in data), "❌ 'id' not found in any product"
    print("✅ test_4_contains_product_id passed")

def test_5_contains_product_name():
    data = json.loads(driver.find_element("tag name", "body").text)
    assert all("name" in product for product in data), "❌ Some products missing 'name'"
    print("✅ test_5_contains_product_name passed")

def test_6_price_is_valid_number():
    data = json.loads(driver.find_element("tag name", "body").text)
    assert all(isinstance(product["price"], (int, float)) for product in data if "price" in product), "❌ Invalid price types"
    print("✅ test_6_price_is_valid_number passed")

def test_7_image_url_validity():
    data = json.loads(driver.find_element("tag name", "body").text)
    assert all("image" in product and product["image"].startswith("http") for product in data), "❌ Some image URLs are invalid"
    print("✅ test_7_image_url_validity passed")

def test_8_description_field_exists():
    data = json.loads(driver.find_element("tag name", "body").text)
    assert all("description" in product for product in data), "❌ Some products missing description"
    print("✅ test_8_description_field_exists passed")

def test_9_category_field_exists():
    data = json.loads(driver.find_element("tag name", "body").text)
    assert all("category" in product for product in data), "❌ Some products missing category"
    print("✅ test_9_category_field_exists passed")

def test_10_each_product_is_unique():
    data = json.loads(driver.find_element("tag name", "body").text)
    ids = [product["id"] for product in data if "id" in product]
    assert len(ids) == len(set(ids)), "❌ Duplicate product IDs found"
    print("✅ test_10_each_product_is_unique passed")

# Run all tests
try:
    test_1_load_products_endpoint()
    test_2_response_is_valid_json()
    test_3_contains_pizza_or_burger()
    test_4_contains_product_id()
    test_5_contains_product_name()
    test_6_price_is_valid_number()
    test_7_image_url_validity()
    test_8_description_field_exists()
    test_9_category_field_exists()
    test_10_each_product_is_unique()
finally:
    driver.quit()
    print("✅ All tests completed.")


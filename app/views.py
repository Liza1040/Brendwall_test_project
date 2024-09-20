from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


def main(request):
    return render(request, "main.html")

@api_view(['POST'])
def create_product(request):
    validate_data(request)
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

def validate_data(request):
    if request.data["price"] == "" or request.data["name"] == "" or request.data["description"] == "":
        raise ValidationError('Поля не должны быть пустыми')
    elif int(request.data["price"]) <= 0:
        raise ValidationError('Цена должна быть положительным числом')

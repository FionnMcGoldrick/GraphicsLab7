import cv2
import matplotlib.pyplot as plt
import numpy as np

#Variables
blockSize = 5
aperture_size = 3
k = 1


#Original Image
image = cv2.imread('ATU1.jpg')
cv2.imshow('Origial', image)
cv2.waitKey(0)

#GrayScale Image
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imshow('Grayscale', gray_image)
cv2.waitKey(0)

#CornerHarris
dst = cv2.cornerHarris(gray_image, blockSize, aperture_size, k)
cv2.imshow('cornerHarris', dst)
cv2.waitKey(0)

import cv2
import matplotlib.pyplot as plt
import numpy as np

# Variables
blockSize = 2
aperture_size = 3
k = 0.04

R = 255
G = 0
B = 0

# Original Image
image = cv2.imread('ATU1.jpg')
cv2.imshow('Original', image)

# GrayScale Image
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imshow('Grayscale', gray_image)

# CornerHarris
dst = cv2.cornerHarris(gray_image, blockSize, aperture_size, k)

# Normalize the result to be in the range [0, 255]
#dst = cv2.dilate(dst, None)
imgHarris = image.copy()  # Create a deep copy of the original image

# Threshold for an optimal value, marking the corners
#imgHarris[dst > 0.01 * dst.max()] = [0, 0, 255]  # Draw red circles at detected corners

threshold = 0.1; #number between 0 and 1
for i in range(len(dst)):
    for j in range(len(dst[i])):
        if dst[i][j] > (threshold*dst.max()):
            cv2.circle(imgHarris,(j,i),3,(B, G, R),-1)

# Show the image with the detected corners
cv2.imshow('Detected Corners', imgHarris)
cv2.waitKey(0)

cv2.destroyAllWindows()



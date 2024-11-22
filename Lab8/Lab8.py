import cv2
import matplotlib.pyplot as plt
import numpy as np

# Original Image
image = cv2.imread('ATU.jpg')
cv2.imshow('Original', image)
cv2.waitKey(0)

# Grayscale Image
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imshow('Grayscale', gray_image)
cv2.waitKey(0)

# Blur Images
imageBlur13 = cv2.GaussianBlur(gray_image, (13, 13), 0)
imageBlur3 = cv2.GaussianBlur(gray_image, (3, 3), 0)

# Sobel Images
sobelHorizontal = cv2.Sobel(imageBlur13, cv2.CV_64F, 1, 0, ksize=5)  # x dir
sobelVertical = cv2.Sobel(imageBlur13, cv2.CV_64F, 0, 1, ksize=5)  # y dir
sobelSum = sobelHorizontal + sobelVertical

# Canny Image
canny = cv2.Canny(image, 100, 200)

# Function to apply threshold
def threshold_image(sobel_sum, threshold):
    # Create a binary image based on the threshold
    binary_image = np.zeros_like(sobel_sum)

    # Loop through each pixel in the Sobel sum image
    for i in range(sobel_sum.shape[0]):
        for j in range(sobel_sum.shape[1]):
            if sobel_sum[i, j] >= threshold:
                binary_image[i, j] = 1  # Set to 1 (white) if above threshold
            else:
                binary_image[i, j] = 0  # Set to 0 (black) if below threshold

    return binary_image

# Try different threshold values (example: 10, 50, 100)
thresholds = [10, 50, 100]

# Plotting
nrows = 3
ncols = 3  # Adjusted to include threshold images

# Subplot for the original images
plt.subplot(nrows, ncols, 1), plt.imshow(image, cmap='gray')
plt.title('Original'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 2), plt.imshow(gray_image, cmap='gray')
plt.title('Grayscale'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 3), plt.imshow(sobelHorizontal, cmap='gray')
plt.title('Horizontal Sobel'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 4), plt.imshow(sobelVertical, cmap='gray')
plt.title('Vertical Sobel'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 5), plt.imshow(sobelSum, cmap='gray')
plt.title('Sobel Sum'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 6), plt.imshow(canny, cmap='gray')
plt.title('Canny'), plt.xticks([]), plt.yticks([])

# Visualizing thresholded images for different thresholds
for idx, threshold in enumerate(thresholds):
    binary_image = threshold_image(sobelSum, threshold)
    plt.subplot(nrows, ncols, idx + 7)  # Adding to the next columns
    plt.imshow(binary_image, cmap='gray')
    plt.title(f'Threshold: {threshold}'), plt.xticks([]), plt.yticks([])

# Show the plot
plt.show()

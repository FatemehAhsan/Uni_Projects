# In the name of God
import matplotlib.pyplot as plt
import random
import tkinter
import statistics
from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg)


def button_function():
    # number of nodes
    n = int(input_txt_n.get())
    # number of iterations
    number_of_iterations = int(input_txt_iterations.get())

    maximum_number_of_edges = n * (n - 1) / 2
    selected_number_of_edges = []
    mean_selected_number_of_edges = []
    mean_selected_number_of_degrees = []
    variance_selected_number_of_degrees = []

    p = 0.5

    expected_result_mean_number_of_edges = maximum_number_of_edges * p
    expected_result_mean_number_of_degrees = (n - 1) * p
    expected_result_variance_number_of_degrees = (n - 1) * p * (1 - p)

    all_edges = []

    for i in range(n):
        for j in range(n):
            if i != j and not all_edges.__contains__([i, j]) and not all_edges.__contains__([j, i]):
                all_edges.append([i, j])

    random_node = random.randint(0, n - 1)

    selected_number_of_degrees = []

    for it in range(number_of_iterations):
        number_of_selected_edges = random.randint(0, maximum_number_of_edges)
        selected_number_of_edges.append(number_of_selected_edges)
        mean_selected_number_of_edges.append(statistics.mean(selected_number_of_edges))
        selected_edges = random.sample(all_edges, number_of_selected_edges)
        degrees = [0] * n
        for selected_nodes in selected_edges:
            degrees[selected_nodes[0]] += 1
            degrees[selected_nodes[1]] += 1
        selected_number_of_degrees.append(degrees[random_node])
        mean_selected_number_of_degrees.append(statistics.mean(selected_number_of_degrees))
        if len(selected_number_of_degrees) > 1:
            variance_selected_number_of_degrees.append(statistics.variance(selected_number_of_degrees))

    # mean of selected number of edges
    fig = plt.Figure(figsize=(4, 5), dpi=100)
    ax1 = fig.add_subplot(111)
    ax1.set_title("mean of edges")
    ax1.plot(range(number_of_iterations), mean_selected_number_of_edges, c='purple', label='result')
    ax1.plot(range(number_of_iterations), [expected_result_mean_number_of_edges] * number_of_iterations, c='orange', label='expected')
    ax1.set_xlabel('iterations')
    ax1.set_ylabel('mean of numbers of edges')
    ax1.legend()
    scatter1 = FigureCanvasTkAgg(fig, master=root)
    scatter1.get_tk_widget().grid(row=1, column=0, padx=5)

    # mean of selected number of degrees
    fig = plt.Figure(figsize=(4, 5), dpi=100)
    ax2 = fig.add_subplot(111)
    ax2.set_title("mean of degrees")
    ax2.plot(range(number_of_iterations), mean_selected_number_of_degrees, c='green', label='result')
    ax2.plot(range(number_of_iterations), [expected_result_mean_number_of_degrees] * number_of_iterations, c='orange', label='expected')
    ax2.set_xlabel('iterations')
    ax2.set_ylabel('mean of numbers of degrees')
    ax2.legend()
    scatter2 = FigureCanvasTkAgg(fig, master=root)
    scatter2.get_tk_widget().grid(row=1, column=1, padx=5)

    # variance of selected number of degrees
    fig = plt.Figure(figsize=(4, 5), dpi=100)
    ax3 = fig.add_subplot(111)
    ax3.set_title("variance of degrees")
    ax3.plot(range(1, number_of_iterations), variance_selected_number_of_degrees, c='pink', label='result')
    ax3.plot(range(number_of_iterations), [expected_result_variance_number_of_degrees] * number_of_iterations, c='orange', label='expected')
    ax3.set_xlabel('iterations')
    ax3.set_ylabel('variance of numbers of degrees')
    ax3.legend()
    scatter3 = FigureCanvasTkAgg(fig, master=root)
    scatter3.get_tk_widget().grid(row=1, column=2, padx=5)


root = tkinter.Tk()
root.title("ER G(n, m)")
root.geometry("1200x600+70+70")
root.config(bg='white')

frame = tkinter.Frame(root, bg='white')
frame.grid(row=0, sticky=tkinter.W)

input_label_n = tkinter.Label(frame, text="number of nodes:", bg='white').grid(row=0, padx=20)
input_label_iter = tkinter.Label(frame, text="number of iterations:", bg='white').grid(row=1, padx=20)

input_txt_n = tkinter.Entry(frame)
input_txt_iterations = tkinter.Entry(frame)

input_txt_n.grid(row=0, column=1)
input_txt_iterations.grid(row=1, column=1)

plot_button = tkinter.Button(master=frame,
                     command=button_function,
                     width=10,
                     text="Run",
                     fg ='white')

plot_button.grid(row=2, padx=10, pady=10)
plot_button.config(bg='lightgreen')
root.mainloop()

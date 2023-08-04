import networkx as nx
import random
import matplotlib.pyplot as plt
import numpy
import tkinter
from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg)


def button_function():
    # number of nodes
    n = int(input_txt_n.get())
    g = nx.Graph()
    m = int(input_txt_m.get())
    B = []

    for i in range(n):
        g.add_node(i)


    all_edges = []


    for i in range(n):
        for j in range(n):
            if i != j and not all_edges.__contains__([i, j]) and not all_edges.__contains__([j, i]):
                all_edges.append([i, j])

    available_edges = all_edges.copy()
    selected_edges = []

    for i in range(m):

        random_edge = random.randint(0,len(available_edges)-1)
        selected_edge = available_edges[random_edge]
        g.add_edge(selected_edge[0],selected_edge[1])
        available_edges.remove(available_edges[random_edge])
        selected_edges.append(selected_edge)

    nx.draw(g, node_color='orange', edge_color='lightgreen', node_size=50)
    plt.show()



    for i in range(n):
        k = g.degree[i]
        B.append(1/(k+1))

    for it in range(20):
        p = []
        indexs = []
        random_edge = random.randint(0,len(selected_edges)-1)
        selected_edge = selected_edges[random_edge]
        for i  in range(n):
            k = g.degree[i]
            if i != selected_edge[0] and  i != selected_edge[1]:
                p.append((k + 1) * B[i])
                indexs.append(i)

        g.remove_edge(selected_edge[0], selected_edge[1])
        selected_edges.remove(selected_edge)
        m_node = indexs[p.index(random.choice(p))]
        g.add_edge(selected_edge[0],m_node)
        selected_edges.append([selected_edge[0],m_node])
        for i in range(n):
            k = g.degree[i]
            B[i] = 1 / (k + 1)


    nx.draw(g, node_color='pink', edge_color='lightgreen', node_size=50)
    plt.show()


root = tkinter.Tk()
root.title("Random Graph with fitness")
root.geometry("1200x600+70+70")
root.config(bg='white')

frame = tkinter.Frame(root, bg='white')
frame.grid(row=0, sticky=tkinter.W)

input_label_n = tkinter.Label(frame, text="number of nodes:", bg='white').grid(row=0, padx=20)
input_label_m = tkinter.Label(frame, text="number of edges:", bg='white').grid(row=1, padx=20)

input_txt_n = tkinter.Entry(frame)

input_txt_m = tkinter.Entry(frame)

input_txt_n.grid(row=0, column=1)

input_txt_m.grid(row=1, column=1)

plot_button = tkinter.Button(master=frame,
                     command=button_function,
                     width=10,
                     text="Run",
                     fg ='white')

plot_button.grid(row=2, column=0, padx=10, pady=10)
plot_button.config(bg='lightgreen')
root.mainloop()




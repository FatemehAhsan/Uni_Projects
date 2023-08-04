import networkx as nx
import matplotlib.pyplot as plt
import io

file_in = io.open('input.txt')

lines = file_in.read().split('\n')

node_finals = []

nodes_str = lines[0]
node_initial = lines[1]
node_final = lines[2]
edges_str = lines[3]
G = nx.DiGraph()
nodes = nodes_str.split(', ')
edges_raw = edges_str.split('-')
G.add_nodes_from(nodes)
node_sizes = []
edge_color_map = []

for node in G:
    if node == node_initial:
        node_sizes.append(200)
    elif node == node_final:
        node_sizes.append(1200)
    else:
        node_sizes.append(600)

edges = []
for edge in edges_raw:
    edge = edge.replace('(', '')
    edge = edge.replace(')', '')
    edge_nodes = edge.split(', ')
    edges.append([edge_nodes[0], edge_nodes[1]])
    G.add_edge(edge_nodes[0], edge_nodes[1])

nx.draw(G, node_color='pink', with_labels=True, edge_color='lightgreen', node_size=node_sizes)

plt.show()

prime_paths = [[[node] for node in nodes]]

end_paths = []

def can_extend(node):
    for edge in edges:
        if edge[0] == node:
            return True
    return False

for node in nodes:
    if not can_extend(node):
        node_finals.append(node)

def has_duplicate_node(path):
    return len(path) != len(set(path))

def has_duplicate_node_not_in_end(path):
    return len(path) != len(set(path)) and path[0] != path[len(path) - 1]

def can_extend_without_duplicate(path):
    last_node = path[len(path) - 1]
    for edge in edges:
        if edge[0] == last_node and not has_duplicate_node_not_in_end(path + [edge[1]]):
            return True
    return False

def is_end(path):
    if (path[len(path) - 1] in node_finals) or has_duplicate_node(path) or not can_extend_without_duplicate(path):
        return True
    return False

def can_append(paths):
    for path in paths:
        if not is_end(path):
            return True
    return False

while can_append(prime_paths[len(prime_paths) - 1]):
    last_paths = prime_paths[len(prime_paths) - 1]
    new_paths = []
    for path in last_paths:
        if not is_end(path):
            last_node = path[len(path) - 1]
            for edge in edges:
                if edge[0] == last_node and not has_duplicate_node_not_in_end(path + [edge[1]]):
                    new_paths.append(path + [edge[1]])
        else:
            end_paths.append(path)
    prime_paths.append(new_paths)

last_paths = prime_paths[len(prime_paths) - 1]

for path in last_paths:
    if is_end(path):
        end_paths.append(path)

def is_subsequent(outseq, inseq, outseq_index):
    j = 1
    while j < len(inseq) and outseq_index + j < len(outseq):
        if outseq[outseq_index + j] != inseq[j]:
            return False
        j += 1
    if j == len(inseq):
        return True
    else:
        return False

def has_subsequent(outseq, inseq):
    for i in range(len(outseq)):
        if inseq[0] == outseq[i] and is_subsequent(outseq, inseq, i):
            return True
    return False

def subpath_exits(paths, path_in):
    for path in paths:
        if has_subsequent(path, path_in):
            return True
    return False

print(prime_paths)
print(end_paths)

final_prime_path = []

for path in reversed(end_paths):
    if not subpath_exits(final_prime_path, path):
        final_prime_path.append(path)

print(final_prime_path)

for path in final_prime_path:
    edge_color_map = []
    for edge in edges:
        if has_subsequent(path, edge):
            edge_color_map.append('blue')
        else:
            edge_color_map.append('pink')
    nx.draw(G, node_color='pink', with_labels=True, edge_color=edge_color_map, node_size=node_sizes)
    plt.show()


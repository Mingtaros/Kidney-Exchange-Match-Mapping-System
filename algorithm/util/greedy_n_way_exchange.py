class GreedyNWayExchange(object):
  def __init__(self, n, method):
    self.n = n
    # method:
    #   - "maximum": n as maximum number of edge in cycle
    #   - "exact": n as exact number of edge in cycle
    if (method not in ["maximum", "exact"]):
      raise ValueError("Method not found, available methods: 'maximum', 'exact'")
    else:
      self.method = method

  def reduce_graph(self, directed_graph):
    pass
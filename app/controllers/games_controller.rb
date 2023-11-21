class GamesController < ApplicationController
    layout "hesabu"

    def initialize
        super    
    end

    def index
    end

    def mads
        @type = params[:type] || 'add'
    end

end

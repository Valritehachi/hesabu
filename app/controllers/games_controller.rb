class GamesController < ApplicationController
    layout "hesabu"

    def initialize
        super    
    end

    def index
    end

    def mads
        difficulties = {
            'add': %w[AAB ABA BBA],
            'sub': %w[AAB ABA BBA],
            'mul': %w[AAB ABA BBA],
            'div': %w[AAB ABA BBA]
        }
        @type = params[:type] || 'add'
        @difficulty = difficulties[@type]
    end

end
